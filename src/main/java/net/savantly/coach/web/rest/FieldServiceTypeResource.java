package net.savantly.coach.web.rest;
import net.savantly.coach.domain.FieldServiceType;
import net.savantly.coach.repository.FieldServiceTypeRepository;
import net.savantly.coach.repository.search.FieldServiceTypeSearchRepository;
import net.savantly.coach.web.rest.errors.BadRequestAlertException;
import net.savantly.coach.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing FieldServiceType.
 */
@RestController
@RequestMapping("/api")
public class FieldServiceTypeResource {

    private final Logger log = LoggerFactory.getLogger(FieldServiceTypeResource.class);

    private static final String ENTITY_NAME = "fieldServiceType";

    private final FieldServiceTypeRepository fieldServiceTypeRepository;

    private final FieldServiceTypeSearchRepository fieldServiceTypeSearchRepository;

    public FieldServiceTypeResource(FieldServiceTypeRepository fieldServiceTypeRepository, FieldServiceTypeSearchRepository fieldServiceTypeSearchRepository) {
        this.fieldServiceTypeRepository = fieldServiceTypeRepository;
        this.fieldServiceTypeSearchRepository = fieldServiceTypeSearchRepository;
    }

    /**
     * POST  /field-service-types : Create a new fieldServiceType.
     *
     * @param fieldServiceType the fieldServiceType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fieldServiceType, or with status 400 (Bad Request) if the fieldServiceType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/field-service-types")
    public ResponseEntity<FieldServiceType> createFieldServiceType(@Valid @RequestBody FieldServiceType fieldServiceType) throws URISyntaxException {
        log.debug("REST request to save FieldServiceType : {}", fieldServiceType);
        if (fieldServiceType.getId() != null) {
            throw new BadRequestAlertException("A new fieldServiceType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FieldServiceType result = fieldServiceTypeRepository.save(fieldServiceType);
        fieldServiceTypeSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/field-service-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /field-service-types : Updates an existing fieldServiceType.
     *
     * @param fieldServiceType the fieldServiceType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fieldServiceType,
     * or with status 400 (Bad Request) if the fieldServiceType is not valid,
     * or with status 500 (Internal Server Error) if the fieldServiceType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/field-service-types")
    public ResponseEntity<FieldServiceType> updateFieldServiceType(@Valid @RequestBody FieldServiceType fieldServiceType) throws URISyntaxException {
        log.debug("REST request to update FieldServiceType : {}", fieldServiceType);
        if (fieldServiceType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FieldServiceType result = fieldServiceTypeRepository.save(fieldServiceType);
        fieldServiceTypeSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fieldServiceType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /field-service-types : get all the fieldServiceTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fieldServiceTypes in body
     */
    @GetMapping("/field-service-types")
    public List<FieldServiceType> getAllFieldServiceTypes() {
        log.debug("REST request to get all FieldServiceTypes");
        return fieldServiceTypeRepository.findAll();
    }

    /**
     * GET  /field-service-types/:id : get the "id" fieldServiceType.
     *
     * @param id the id of the fieldServiceType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fieldServiceType, or with status 404 (Not Found)
     */
    @GetMapping("/field-service-types/{id}")
    public ResponseEntity<FieldServiceType> getFieldServiceType(@PathVariable Long id) {
        log.debug("REST request to get FieldServiceType : {}", id);
        Optional<FieldServiceType> fieldServiceType = fieldServiceTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fieldServiceType);
    }

    /**
     * DELETE  /field-service-types/:id : delete the "id" fieldServiceType.
     *
     * @param id the id of the fieldServiceType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/field-service-types/{id}")
    public ResponseEntity<Void> deleteFieldServiceType(@PathVariable Long id) {
        log.debug("REST request to delete FieldServiceType : {}", id);
        fieldServiceTypeRepository.deleteById(id);
        fieldServiceTypeSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/field-service-types?query=:query : search for the fieldServiceType corresponding
     * to the query.
     *
     * @param query the query of the fieldServiceType search
     * @return the result of the search
     */
    @GetMapping("/_search/field-service-types")
    public List<FieldServiceType> searchFieldServiceTypes(@RequestParam String query) {
        log.debug("REST request to search FieldServiceTypes for query {}", query);
        return StreamSupport
            .stream(fieldServiceTypeSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
