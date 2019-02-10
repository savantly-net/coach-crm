package net.savantly.coach.web.rest;

import net.savantly.coach.CoachApp;

import net.savantly.coach.domain.FieldServiceType;
import net.savantly.coach.repository.FieldServiceTypeRepository;
import net.savantly.coach.repository.search.FieldServiceTypeSearchRepository;
import net.savantly.coach.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static net.savantly.coach.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FieldServiceTypeResource REST controller.
 *
 * @see FieldServiceTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CoachApp.class)
public class FieldServiceTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private FieldServiceTypeRepository fieldServiceTypeRepository;

    /**
     * This repository is mocked in the net.savantly.coach.repository.search test package.
     *
     * @see net.savantly.coach.repository.search.FieldServiceTypeSearchRepositoryMockConfiguration
     */
    @Autowired
    private FieldServiceTypeSearchRepository mockFieldServiceTypeSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restFieldServiceTypeMockMvc;

    private FieldServiceType fieldServiceType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FieldServiceTypeResource fieldServiceTypeResource = new FieldServiceTypeResource(fieldServiceTypeRepository, mockFieldServiceTypeSearchRepository);
        this.restFieldServiceTypeMockMvc = MockMvcBuilders.standaloneSetup(fieldServiceTypeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FieldServiceType createEntity(EntityManager em) {
        FieldServiceType fieldServiceType = new FieldServiceType()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return fieldServiceType;
    }

    @Before
    public void initTest() {
        fieldServiceType = createEntity(em);
    }

    @Test
    @Transactional
    public void createFieldServiceType() throws Exception {
        int databaseSizeBeforeCreate = fieldServiceTypeRepository.findAll().size();

        // Create the FieldServiceType
        restFieldServiceTypeMockMvc.perform(post("/api/field-service-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldServiceType)))
            .andExpect(status().isCreated());

        // Validate the FieldServiceType in the database
        List<FieldServiceType> fieldServiceTypeList = fieldServiceTypeRepository.findAll();
        assertThat(fieldServiceTypeList).hasSize(databaseSizeBeforeCreate + 1);
        FieldServiceType testFieldServiceType = fieldServiceTypeList.get(fieldServiceTypeList.size() - 1);
        assertThat(testFieldServiceType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFieldServiceType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the FieldServiceType in Elasticsearch
        verify(mockFieldServiceTypeSearchRepository, times(1)).save(testFieldServiceType);
    }

    @Test
    @Transactional
    public void createFieldServiceTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fieldServiceTypeRepository.findAll().size();

        // Create the FieldServiceType with an existing ID
        fieldServiceType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFieldServiceTypeMockMvc.perform(post("/api/field-service-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldServiceType)))
            .andExpect(status().isBadRequest());

        // Validate the FieldServiceType in the database
        List<FieldServiceType> fieldServiceTypeList = fieldServiceTypeRepository.findAll();
        assertThat(fieldServiceTypeList).hasSize(databaseSizeBeforeCreate);

        // Validate the FieldServiceType in Elasticsearch
        verify(mockFieldServiceTypeSearchRepository, times(0)).save(fieldServiceType);
    }

    @Test
    @Transactional
    public void getAllFieldServiceTypes() throws Exception {
        // Initialize the database
        fieldServiceTypeRepository.saveAndFlush(fieldServiceType);

        // Get all the fieldServiceTypeList
        restFieldServiceTypeMockMvc.perform(get("/api/field-service-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldServiceType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getFieldServiceType() throws Exception {
        // Initialize the database
        fieldServiceTypeRepository.saveAndFlush(fieldServiceType);

        // Get the fieldServiceType
        restFieldServiceTypeMockMvc.perform(get("/api/field-service-types/{id}", fieldServiceType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fieldServiceType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFieldServiceType() throws Exception {
        // Get the fieldServiceType
        restFieldServiceTypeMockMvc.perform(get("/api/field-service-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFieldServiceType() throws Exception {
        // Initialize the database
        fieldServiceTypeRepository.saveAndFlush(fieldServiceType);

        int databaseSizeBeforeUpdate = fieldServiceTypeRepository.findAll().size();

        // Update the fieldServiceType
        FieldServiceType updatedFieldServiceType = fieldServiceTypeRepository.findById(fieldServiceType.getId()).get();
        // Disconnect from session so that the updates on updatedFieldServiceType are not directly saved in db
        em.detach(updatedFieldServiceType);
        updatedFieldServiceType
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restFieldServiceTypeMockMvc.perform(put("/api/field-service-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFieldServiceType)))
            .andExpect(status().isOk());

        // Validate the FieldServiceType in the database
        List<FieldServiceType> fieldServiceTypeList = fieldServiceTypeRepository.findAll();
        assertThat(fieldServiceTypeList).hasSize(databaseSizeBeforeUpdate);
        FieldServiceType testFieldServiceType = fieldServiceTypeList.get(fieldServiceTypeList.size() - 1);
        assertThat(testFieldServiceType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFieldServiceType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the FieldServiceType in Elasticsearch
        verify(mockFieldServiceTypeSearchRepository, times(1)).save(testFieldServiceType);
    }

    @Test
    @Transactional
    public void updateNonExistingFieldServiceType() throws Exception {
        int databaseSizeBeforeUpdate = fieldServiceTypeRepository.findAll().size();

        // Create the FieldServiceType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFieldServiceTypeMockMvc.perform(put("/api/field-service-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldServiceType)))
            .andExpect(status().isBadRequest());

        // Validate the FieldServiceType in the database
        List<FieldServiceType> fieldServiceTypeList = fieldServiceTypeRepository.findAll();
        assertThat(fieldServiceTypeList).hasSize(databaseSizeBeforeUpdate);

        // Validate the FieldServiceType in Elasticsearch
        verify(mockFieldServiceTypeSearchRepository, times(0)).save(fieldServiceType);
    }

    @Test
    @Transactional
    public void deleteFieldServiceType() throws Exception {
        // Initialize the database
        fieldServiceTypeRepository.saveAndFlush(fieldServiceType);

        int databaseSizeBeforeDelete = fieldServiceTypeRepository.findAll().size();

        // Delete the fieldServiceType
        restFieldServiceTypeMockMvc.perform(delete("/api/field-service-types/{id}", fieldServiceType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FieldServiceType> fieldServiceTypeList = fieldServiceTypeRepository.findAll();
        assertThat(fieldServiceTypeList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the FieldServiceType in Elasticsearch
        verify(mockFieldServiceTypeSearchRepository, times(1)).deleteById(fieldServiceType.getId());
    }

    @Test
    @Transactional
    public void searchFieldServiceType() throws Exception {
        // Initialize the database
        fieldServiceTypeRepository.saveAndFlush(fieldServiceType);
        when(mockFieldServiceTypeSearchRepository.search(queryStringQuery("id:" + fieldServiceType.getId())))
            .thenReturn(Collections.singletonList(fieldServiceType));
        // Search the fieldServiceType
        restFieldServiceTypeMockMvc.perform(get("/api/_search/field-service-types?query=id:" + fieldServiceType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldServiceType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FieldServiceType.class);
        FieldServiceType fieldServiceType1 = new FieldServiceType();
        fieldServiceType1.setId(1L);
        FieldServiceType fieldServiceType2 = new FieldServiceType();
        fieldServiceType2.setId(fieldServiceType1.getId());
        assertThat(fieldServiceType1).isEqualTo(fieldServiceType2);
        fieldServiceType2.setId(2L);
        assertThat(fieldServiceType1).isNotEqualTo(fieldServiceType2);
        fieldServiceType1.setId(null);
        assertThat(fieldServiceType1).isNotEqualTo(fieldServiceType2);
    }
}
