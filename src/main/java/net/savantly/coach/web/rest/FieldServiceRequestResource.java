package net.savantly.coach.web.rest;
import net.savantly.coach.domain.FieldServiceRequest;
import net.savantly.coach.repository.FieldServiceRequestRepository;
import net.savantly.coach.repository.search.FieldServiceRequestSearchRepository;
import net.savantly.coach.web.rest.errors.BadRequestAlertException;
import net.savantly.coach.web.rest.util.HeaderUtil;
import net.savantly.coach.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing FieldServiceRequest.
 */
@RestController
@RequestMapping("/api")
public class FieldServiceRequestResource {

    private final Logger log = LoggerFactory.getLogger(FieldServiceRequestResource.class);

    private static final String ENTITY_NAME = "fieldServiceRequest";

    private final FieldServiceRequestRepository fieldServiceRequestRepository;

    private final FieldServiceRequestSearchRepository fieldServiceRequestSearchRepository;

    public FieldServiceRequestResource(FieldServiceRequestRepository fieldServiceRequestRepository, FieldServiceRequestSearchRepository fieldServiceRequestSearchRepository) {
        this.fieldServiceRequestRepository = fieldServiceRequestRepository;
        this.fieldServiceRequestSearchRepository = fieldServiceRequestSearchRepository;
    }

    /**
     * POST  /field-service-requests : Create a new fieldServiceRequest.
     *
     * @param fieldServiceRequest the fieldServiceRequest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fieldServiceRequest, or with status 400 (Bad Request) if the fieldServiceRequest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/field-service-requests")
    public ResponseEntity<FieldServiceRequest> createFieldServiceRequest(@RequestBody FieldServiceRequest fieldServiceRequest) throws URISyntaxException {
        log.debug("REST request to save FieldServiceRequest : {}", fieldServiceRequest);
        if (fieldServiceRequest.getId() != null) {
            throw new BadRequestAlertException("A new fieldServiceRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FieldServiceRequest result = fieldServiceRequestRepository.save(fieldServiceRequest);
        fieldServiceRequestSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/field-service-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /field-service-requests : Updates an existing fieldServiceRequest.
     *
     * @param fieldServiceRequest the fieldServiceRequest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fieldServiceRequest,
     * or with status 400 (Bad Request) if the fieldServiceRequest is not valid,
     * or with status 500 (Internal Server Error) if the fieldServiceRequest couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/field-service-requests")
    public ResponseEntity<FieldServiceRequest> updateFieldServiceRequest(@RequestBody FieldServiceRequest fieldServiceRequest) throws URISyntaxException {
        log.debug("REST request to update FieldServiceRequest : {}", fieldServiceRequest);
        if (fieldServiceRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FieldServiceRequest result = fieldServiceRequestRepository.save(fieldServiceRequest);
        fieldServiceRequestSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fieldServiceRequest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /field-service-requests : get all the fieldServiceRequests.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of fieldServiceRequests in body
     */
    @GetMapping("/field-service-requests")
    public ResponseEntity<List<FieldServiceRequest>> getAllFieldServiceRequests(Pageable pageable) {
        log.debug("REST request to get a page of FieldServiceRequests");
        Page<FieldServiceRequest> page = fieldServiceRequestRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/field-service-requests");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /field-service-requests/:id : get the "id" fieldServiceRequest.
     *
     * @param id the id of the fieldServiceRequest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fieldServiceRequest, or with status 404 (Not Found)
     */
    @GetMapping("/field-service-requests/{id}")
    public ResponseEntity<FieldServiceRequest> getFieldServiceRequest(@PathVariable Long id) {
        log.debug("REST request to get FieldServiceRequest : {}", id);
        Optional<FieldServiceRequest> fieldServiceRequest = fieldServiceRequestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fieldServiceRequest);
    }

    /**
     * DELETE  /field-service-requests/:id : delete the "id" fieldServiceRequest.
     *
     * @param id the id of the fieldServiceRequest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/field-service-requests/{id}")
    public ResponseEntity<Void> deleteFieldServiceRequest(@PathVariable Long id) {
        log.debug("REST request to delete FieldServiceRequest : {}", id);
        fieldServiceRequestRepository.deleteById(id);
        fieldServiceRequestSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/field-service-requests?query=:query : search for the fieldServiceRequest corresponding
     * to the query.
     *
     * @param query the query of the fieldServiceRequest search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/field-service-requests")
    public ResponseEntity<List<FieldServiceRequest>> searchFieldServiceRequests(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of FieldServiceRequests for query {}", query);
        Page<FieldServiceRequest> page = fieldServiceRequestSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/field-service-requests");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
