package net.savantly.coach.repository.search;

import net.savantly.coach.domain.Site;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Site entity.
 */
public interface SiteSearchRepository extends ElasticsearchRepository<Site, Long> {
}
