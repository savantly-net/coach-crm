package net.savantly.coach.repository.search;

import net.savantly.coach.domain.FieldServiceType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the FieldServiceType entity.
 */
public interface FieldServiceTypeSearchRepository extends ElasticsearchRepository<FieldServiceType, Long> {
}
