package net.savantly.coach.web.rest;

import net.savantly.coach.CoachApp;

import net.savantly.coach.domain.FieldServiceRequest;
import net.savantly.coach.repository.FieldServiceRequestRepository;
import net.savantly.coach.repository.search.FieldServiceRequestSearchRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;


import static net.savantly.coach.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import net.savantly.coach.domain.enumeration.FieldServiceStatus;
/**
 * Test class for the FieldServiceRequestResource REST controller.
 *
 * @see FieldServiceRequestResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CoachApp.class)
public class FieldServiceRequestResourceIntTest {

    private static final FieldServiceStatus DEFAULT_STATUS = FieldServiceStatus.PROPOSAL;
    private static final FieldServiceStatus UPDATED_STATUS = FieldServiceStatus.CONTRACT;

    private static final LocalDate DEFAULT_CONTRACT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CONTRACT_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FINISH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FINISH_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_TOTAL = 1D;
    private static final Double UPDATED_TOTAL = 2D;

    @Autowired
    private FieldServiceRequestRepository fieldServiceRequestRepository;

    /**
     * This repository is mocked in the net.savantly.coach.repository.search test package.
     *
     * @see net.savantly.coach.repository.search.FieldServiceRequestSearchRepositoryMockConfiguration
     */
    @Autowired
    private FieldServiceRequestSearchRepository mockFieldServiceRequestSearchRepository;

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

    private MockMvc restFieldServiceRequestMockMvc;

    private FieldServiceRequest fieldServiceRequest;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FieldServiceRequestResource fieldServiceRequestResource = new FieldServiceRequestResource(fieldServiceRequestRepository, mockFieldServiceRequestSearchRepository);
        this.restFieldServiceRequestMockMvc = MockMvcBuilders.standaloneSetup(fieldServiceRequestResource)
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
    public static FieldServiceRequest createEntity(EntityManager em) {
        FieldServiceRequest fieldServiceRequest = new FieldServiceRequest()
            .status(DEFAULT_STATUS)
            .contractDate(DEFAULT_CONTRACT_DATE)
            .startDate(DEFAULT_START_DATE)
            .finishDate(DEFAULT_FINISH_DATE)
            .description(DEFAULT_DESCRIPTION)
            .total(DEFAULT_TOTAL);
        return fieldServiceRequest;
    }

    @Before
    public void initTest() {
        fieldServiceRequest = createEntity(em);
    }

    @Test
    @Transactional
    public void createFieldServiceRequest() throws Exception {
        int databaseSizeBeforeCreate = fieldServiceRequestRepository.findAll().size();

        // Create the FieldServiceRequest
        restFieldServiceRequestMockMvc.perform(post("/api/field-service-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldServiceRequest)))
            .andExpect(status().isCreated());

        // Validate the FieldServiceRequest in the database
        List<FieldServiceRequest> fieldServiceRequestList = fieldServiceRequestRepository.findAll();
        assertThat(fieldServiceRequestList).hasSize(databaseSizeBeforeCreate + 1);
        FieldServiceRequest testFieldServiceRequest = fieldServiceRequestList.get(fieldServiceRequestList.size() - 1);
        assertThat(testFieldServiceRequest.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testFieldServiceRequest.getContractDate()).isEqualTo(DEFAULT_CONTRACT_DATE);
        assertThat(testFieldServiceRequest.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testFieldServiceRequest.getFinishDate()).isEqualTo(DEFAULT_FINISH_DATE);
        assertThat(testFieldServiceRequest.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testFieldServiceRequest.getTotal()).isEqualTo(DEFAULT_TOTAL);

        // Validate the FieldServiceRequest in Elasticsearch
        verify(mockFieldServiceRequestSearchRepository, times(1)).save(testFieldServiceRequest);
    }

    @Test
    @Transactional
    public void createFieldServiceRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fieldServiceRequestRepository.findAll().size();

        // Create the FieldServiceRequest with an existing ID
        fieldServiceRequest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFieldServiceRequestMockMvc.perform(post("/api/field-service-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldServiceRequest)))
            .andExpect(status().isBadRequest());

        // Validate the FieldServiceRequest in the database
        List<FieldServiceRequest> fieldServiceRequestList = fieldServiceRequestRepository.findAll();
        assertThat(fieldServiceRequestList).hasSize(databaseSizeBeforeCreate);

        // Validate the FieldServiceRequest in Elasticsearch
        verify(mockFieldServiceRequestSearchRepository, times(0)).save(fieldServiceRequest);
    }

    @Test
    @Transactional
    public void getAllFieldServiceRequests() throws Exception {
        // Initialize the database
        fieldServiceRequestRepository.saveAndFlush(fieldServiceRequest);

        // Get all the fieldServiceRequestList
        restFieldServiceRequestMockMvc.perform(get("/api/field-service-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldServiceRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].contractDate").value(hasItem(DEFAULT_CONTRACT_DATE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].finishDate").value(hasItem(DEFAULT_FINISH_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getFieldServiceRequest() throws Exception {
        // Initialize the database
        fieldServiceRequestRepository.saveAndFlush(fieldServiceRequest);

        // Get the fieldServiceRequest
        restFieldServiceRequestMockMvc.perform(get("/api/field-service-requests/{id}", fieldServiceRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fieldServiceRequest.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.contractDate").value(DEFAULT_CONTRACT_DATE.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.finishDate").value(DEFAULT_FINISH_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFieldServiceRequest() throws Exception {
        // Get the fieldServiceRequest
        restFieldServiceRequestMockMvc.perform(get("/api/field-service-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFieldServiceRequest() throws Exception {
        // Initialize the database
        fieldServiceRequestRepository.saveAndFlush(fieldServiceRequest);

        int databaseSizeBeforeUpdate = fieldServiceRequestRepository.findAll().size();

        // Update the fieldServiceRequest
        FieldServiceRequest updatedFieldServiceRequest = fieldServiceRequestRepository.findById(fieldServiceRequest.getId()).get();
        // Disconnect from session so that the updates on updatedFieldServiceRequest are not directly saved in db
        em.detach(updatedFieldServiceRequest);
        updatedFieldServiceRequest
            .status(UPDATED_STATUS)
            .contractDate(UPDATED_CONTRACT_DATE)
            .startDate(UPDATED_START_DATE)
            .finishDate(UPDATED_FINISH_DATE)
            .description(UPDATED_DESCRIPTION)
            .total(UPDATED_TOTAL);

        restFieldServiceRequestMockMvc.perform(put("/api/field-service-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFieldServiceRequest)))
            .andExpect(status().isOk());

        // Validate the FieldServiceRequest in the database
        List<FieldServiceRequest> fieldServiceRequestList = fieldServiceRequestRepository.findAll();
        assertThat(fieldServiceRequestList).hasSize(databaseSizeBeforeUpdate);
        FieldServiceRequest testFieldServiceRequest = fieldServiceRequestList.get(fieldServiceRequestList.size() - 1);
        assertThat(testFieldServiceRequest.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testFieldServiceRequest.getContractDate()).isEqualTo(UPDATED_CONTRACT_DATE);
        assertThat(testFieldServiceRequest.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testFieldServiceRequest.getFinishDate()).isEqualTo(UPDATED_FINISH_DATE);
        assertThat(testFieldServiceRequest.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testFieldServiceRequest.getTotal()).isEqualTo(UPDATED_TOTAL);

        // Validate the FieldServiceRequest in Elasticsearch
        verify(mockFieldServiceRequestSearchRepository, times(1)).save(testFieldServiceRequest);
    }

    @Test
    @Transactional
    public void updateNonExistingFieldServiceRequest() throws Exception {
        int databaseSizeBeforeUpdate = fieldServiceRequestRepository.findAll().size();

        // Create the FieldServiceRequest

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFieldServiceRequestMockMvc.perform(put("/api/field-service-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldServiceRequest)))
            .andExpect(status().isBadRequest());

        // Validate the FieldServiceRequest in the database
        List<FieldServiceRequest> fieldServiceRequestList = fieldServiceRequestRepository.findAll();
        assertThat(fieldServiceRequestList).hasSize(databaseSizeBeforeUpdate);

        // Validate the FieldServiceRequest in Elasticsearch
        verify(mockFieldServiceRequestSearchRepository, times(0)).save(fieldServiceRequest);
    }

    @Test
    @Transactional
    public void deleteFieldServiceRequest() throws Exception {
        // Initialize the database
        fieldServiceRequestRepository.saveAndFlush(fieldServiceRequest);

        int databaseSizeBeforeDelete = fieldServiceRequestRepository.findAll().size();

        // Delete the fieldServiceRequest
        restFieldServiceRequestMockMvc.perform(delete("/api/field-service-requests/{id}", fieldServiceRequest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FieldServiceRequest> fieldServiceRequestList = fieldServiceRequestRepository.findAll();
        assertThat(fieldServiceRequestList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the FieldServiceRequest in Elasticsearch
        verify(mockFieldServiceRequestSearchRepository, times(1)).deleteById(fieldServiceRequest.getId());
    }

    @Test
    @Transactional
    public void searchFieldServiceRequest() throws Exception {
        // Initialize the database
        fieldServiceRequestRepository.saveAndFlush(fieldServiceRequest);
        when(mockFieldServiceRequestSearchRepository.search(queryStringQuery("id:" + fieldServiceRequest.getId())))
            .thenReturn(Collections.singletonList(fieldServiceRequest));
        // Search the fieldServiceRequest
        restFieldServiceRequestMockMvc.perform(get("/api/_search/field-service-requests?query=id:" + fieldServiceRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldServiceRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].contractDate").value(hasItem(DEFAULT_CONTRACT_DATE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].finishDate").value(hasItem(DEFAULT_FINISH_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FieldServiceRequest.class);
        FieldServiceRequest fieldServiceRequest1 = new FieldServiceRequest();
        fieldServiceRequest1.setId(1L);
        FieldServiceRequest fieldServiceRequest2 = new FieldServiceRequest();
        fieldServiceRequest2.setId(fieldServiceRequest1.getId());
        assertThat(fieldServiceRequest1).isEqualTo(fieldServiceRequest2);
        fieldServiceRequest2.setId(2L);
        assertThat(fieldServiceRequest1).isNotEqualTo(fieldServiceRequest2);
        fieldServiceRequest1.setId(null);
        assertThat(fieldServiceRequest1).isNotEqualTo(fieldServiceRequest2);
    }
}
