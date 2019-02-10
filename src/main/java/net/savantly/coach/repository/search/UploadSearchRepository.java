package net.savantly.coach.repository.search;

import net.savantly.coach.domain.Upload;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Upload entity.
 */
public interface UploadSearchRepository extends ElasticsearchRepository<Upload, Long> {
}
