package net.savantly.coach.repository.search;

import net.savantly.coach.domain.ContactPhone;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ContactPhone entity.
 */
public interface ContactPhoneSearchRepository extends ElasticsearchRepository<ContactPhone, Long> {
}
