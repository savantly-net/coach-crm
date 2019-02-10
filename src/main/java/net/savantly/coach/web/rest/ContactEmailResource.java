package net.savantly.coach.web.rest;
import net.savantly.coach.domain.ContactEmail;
import net.savantly.coach.repository.ContactEmailRepository;
import net.savantly.coach.repository.search.ContactEmailSearchRepository;
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
 * REST controller for managing ContactEmail.
 */
@RestController
@RequestMapping("/api")
public class ContactEmailResource {

    private final Logger log = LoggerFactory.getLogger(ContactEmailResource.class);

    private static final String ENTITY_NAME = "contactEmail";

    private final ContactEmailRepository contactEmailRepository;

    private final ContactEmailSearchRepository contactEmailSearchRepository;

    public ContactEmailResource(ContactEmailRepository contactEmailRepository, ContactEmailSearchRepository contactEmailSearchRepository) {
        this.contactEmailRepository = contactEmailRepository;
        this.contactEmailSearchRepository = contactEmailSearchRepository;
    }

    /**
     * POST  /contact-emails : Create a new contactEmail.
     *
     * @param contactEmail the contactEmail to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contactEmail, or with status 400 (Bad Request) if the contactEmail has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contact-emails")
    public ResponseEntity<ContactEmail> createContactEmail(@RequestBody ContactEmail contactEmail) throws URISyntaxException {
        log.debug("REST request to save ContactEmail : {}", contactEmail);
        if (contactEmail.getId() != null) {
            throw new BadRequestAlertException("A new contactEmail cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContactEmail result = contactEmailRepository.save(contactEmail);
        contactEmailSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/contact-emails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contact-emails : Updates an existing contactEmail.
     *
     * @param contactEmail the contactEmail to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contactEmail,
     * or with status 400 (Bad Request) if the contactEmail is not valid,
     * or with status 500 (Internal Server Error) if the contactEmail couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contact-emails")
    public ResponseEntity<ContactEmail> updateContactEmail(@RequestBody ContactEmail contactEmail) throws URISyntaxException {
        log.debug("REST request to update ContactEmail : {}", contactEmail);
        if (contactEmail.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContactEmail result = contactEmailRepository.save(contactEmail);
        contactEmailSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contactEmail.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contact-emails : get all the contactEmails.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of contactEmails in body
     */
    @GetMapping("/contact-emails")
    public List<ContactEmail> getAllContactEmails() {
        log.debug("REST request to get all ContactEmails");
        return contactEmailRepository.findAll();
    }

    /**
     * GET  /contact-emails/:id : get the "id" contactEmail.
     *
     * @param id the id of the contactEmail to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contactEmail, or with status 404 (Not Found)
     */
    @GetMapping("/contact-emails/{id}")
    public ResponseEntity<ContactEmail> getContactEmail(@PathVariable Long id) {
        log.debug("REST request to get ContactEmail : {}", id);
        Optional<ContactEmail> contactEmail = contactEmailRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contactEmail);
    }

    /**
     * DELETE  /contact-emails/:id : delete the "id" contactEmail.
     *
     * @param id the id of the contactEmail to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contact-emails/{id}")
    public ResponseEntity<Void> deleteContactEmail(@PathVariable Long id) {
        log.debug("REST request to delete ContactEmail : {}", id);
        contactEmailRepository.deleteById(id);
        contactEmailSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/contact-emails?query=:query : search for the contactEmail corresponding
     * to the query.
     *
     * @param query the query of the contactEmail search
     * @return the result of the search
     */
    @GetMapping("/_search/contact-emails")
    public List<ContactEmail> searchContactEmails(@RequestParam String query) {
        log.debug("REST request to search ContactEmails for query {}", query);
        return StreamSupport
            .stream(contactEmailSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
