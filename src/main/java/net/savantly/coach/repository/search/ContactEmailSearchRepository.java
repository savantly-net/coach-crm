package net.savantly.coach.repository.search;

import net.savantly.coach.domain.ContactEmail;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ContactEmail entity.
 */
public interface ContactEmailSearchRepository extends ElasticsearchRepository<ContactEmail, Long> {
}
