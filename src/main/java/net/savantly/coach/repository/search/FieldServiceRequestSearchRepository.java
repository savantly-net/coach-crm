package net.savantly.coach.repository.search;

import net.savantly.coach.domain.FieldServiceRequest;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FieldServiceRequest entity.
 */
public interface FieldServiceRequestSearchRepository extends ElasticsearchRepository<FieldServiceRequest, Long> {
}
