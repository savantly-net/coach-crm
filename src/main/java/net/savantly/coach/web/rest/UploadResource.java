package net.savantly.coach.web.rest;
import net.savantly.coach.domain.Upload;
import net.savantly.coach.repository.UploadRepository;
import net.savantly.coach.repository.search.UploadSearchRepository;
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
 * REST controller for managing Upload.
 */
@RestController
@RequestMapping("/api")
public class UploadResource {

    private final Logger log = LoggerFactory.getLogger(UploadResource.class);

    private static final String ENTITY_NAME = "upload";

    private final UploadRepository uploadRepository;

    private final UploadSearchRepository uploadSearchRepository;

    public UploadResource(UploadRepository uploadRepository, UploadSearchRepository uploadSearchRepository) {
        this.uploadRepository = uploadRepository;
        this.uploadSearchRepository = uploadSearchRepository;
    }

    /**
     * POST  /uploads : Create a new upload.
     *
     * @param upload the upload to create
     * @return the ResponseEntity with status 201 (Created) and with body the new upload, or with status 400 (Bad Request) if the upload has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/uploads")
    public ResponseEntity<Upload> createUpload(@Valid @RequestBody Upload upload) throws URISyntaxException {
        log.debug("REST request to save Upload : {}", upload);
        if (upload.getId() != null) {
            throw new BadRequestAlertException("A new upload cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Upload result = uploadRepository.save(upload);
        uploadSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/uploads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /uploads : Updates an existing upload.
     *
     * @param upload the upload to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated upload,
     * or with status 400 (Bad Request) if the upload is not valid,
     * or with status 500 (Internal Server Error) if the upload couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/uploads")
    public ResponseEntity<Upload> updateUpload(@Valid @RequestBody Upload upload) throws URISyntaxException {
        log.debug("REST request to update Upload : {}", upload);
        if (upload.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Upload result = uploadRepository.save(upload);
        uploadSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, upload.getId().toString()))
            .body(result);
    }

    /**
     * GET  /uploads : get all the uploads.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of uploads in body
     */
    @GetMapping("/uploads")
    public List<Upload> getAllUploads() {
        log.debug("REST request to get all Uploads");
        return uploadRepository.findAll();
    }

    /**
     * GET  /uploads/:id : get the "id" upload.
     *
     * @param id the id of the upload to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the upload, or with status 404 (Not Found)
     */
    @GetMapping("/uploads/{id}")
    public ResponseEntity<Upload> getUpload(@PathVariable Long id) {
        log.debug("REST request to get Upload : {}", id);
        Optional<Upload> upload = uploadRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(upload);
    }

    /**
     * DELETE  /uploads/:id : delete the "id" upload.
     *
     * @param id the id of the upload to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/uploads/{id}")
    public ResponseEntity<Void> deleteUpload(@PathVariable Long id) {
        log.debug("REST request to delete Upload : {}", id);
        uploadRepository.deleteById(id);
        uploadSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/uploads?query=:query : search for the upload corresponding
     * to the query.
     *
     * @param query the query of the upload search
     * @return the result of the search
     */
    @GetMapping("/_search/uploads")
    public List<Upload> searchUploads(@RequestParam String query) {
        log.debug("REST request to search Uploads for query {}", query);
        return StreamSupport
            .stream(uploadSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
