package net.savantly.coach.web.rest;
import net.savantly.coach.domain.ContactPhone;
import net.savantly.coach.repository.ContactPhoneRepository;
import net.savantly.coach.repository.search.ContactPhoneSearchRepository;
import net.savantly.coach.web.rest.errors.BadRequestAlertException;
import net.savantly.coach.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing ContactPhone.
 */
@RestController
@RequestMapping("/api")
public class ContactPhoneResource {

    private final Logger log = LoggerFactory.getLogger(ContactPhoneResource.class);

    private static final String ENTITY_NAME = "contactPhone";

    private final ContactPhoneRepository contactPhoneRepository;

    private final ContactPhoneSearchRepository contactPhoneSearchRepository;

    public ContactPhoneResource(ContactPhoneRepository contactPhoneRepository, ContactPhoneSearchRepository contactPhoneSearchRepository) {
        this.contactPhoneRepository = contactPhoneRepository;
        this.contactPhoneSearchRepository = contactPhoneSearchRepository;
    }

    /**
     * POST  /contact-phones : Create a new contactPhone.
     *
     * @param contactPhone the contactPhone to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contactPhone, or with status 400 (Bad Request) if the contactPhone has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contact-phones")
    public ResponseEntity<ContactPhone> createContactPhone(@RequestBody ContactPhone contactPhone) throws URISyntaxException {
        log.debug("REST request to save ContactPhone : {}", contactPhone);
        if (contactPhone.getId() != null) {
            throw new BadRequestAlertException("A new contactPhone cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContactPhone result = contactPhoneRepository.save(contactPhone);
        contactPhoneSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/contact-phones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contact-phones : Updates an existing contactPhone.
     *
     * @param contactPhone the contactPhone to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contactPhone,
     * or with status 400 (Bad Request) if the contactPhone is not valid,
     * or with status 500 (Internal Server Error) if the contactPhone couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contact-phones")
    public ResponseEntity<ContactPhone> updateContactPhone(@RequestBody ContactPhone contactPhone) throws URISyntaxException {
        log.debug("REST request to update ContactPhone : {}", contactPhone);
        if (contactPhone.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContactPhone result = contactPhoneRepository.save(contactPhone);
        contactPhoneSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contactPhone.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contact-phones : get all the contactPhones.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contactPhones in body
     */
    @GetMapping("/contact-phones")
    public List<ContactPhone> getAllContactPhones() {
        log.debug("REST request to get all ContactPhones");
        return contactPhoneRepository.findAll();
    }

    /**
     * GET  /contact-phones/:id : get the "id" contactPhone.
     *
     * @param id the id of the contactPhone to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contactPhone, or with status 404 (Not Found)
     */
    @GetMapping("/contact-phones/{id}")
    public ResponseEntity<ContactPhone> getContactPhone(@PathVariable Long id) {
        log.debug("REST request to get ContactPhone : {}", id);
        Optional<ContactPhone> contactPhone = contactPhoneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contactPhone);
    }

    /**
     * DELETE  /contact-phones/:id : delete the "id" contactPhone.
     *
     * @param id the id of the contactPhone to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contact-phones/{id}")
    public ResponseEntity<Void> deleteContactPhone(@PathVariable Long id) {
        log.debug("REST request to delete ContactPhone : {}", id);
        contactPhoneRepository.deleteById(id);
        contactPhoneSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/contact-phones?query=:query : search for the contactPhone corresponding
     * to the query.
     *
     * @param query the query of the contactPhone search
     * @return the result of the search
     */
    @GetMapping("/_search/contact-phones")
    public List<ContactPhone> searchContactPhones(@RequestParam String query) {
        log.debug("REST request to search ContactPhones for query {}", query);
        return StreamSupport
            .stream(contactPhoneSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
