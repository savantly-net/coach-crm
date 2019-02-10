package net.savantly.coach.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of UploadSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class UploadSearchRepositoryMockConfiguration {

    @MockBean
    private UploadSearchRepository mockUploadSearchRepository;

}
