package net.savantly.coach.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of FieldServiceTypeSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class FieldServiceTypeSearchRepositoryMockConfiguration {

    @MockBean
    private FieldServiceTypeSearchRepository mockFieldServiceTypeSearchRepository;

}
