package net.savantly.coach.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of ContactEmailSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ContactEmailSearchRepositoryMockConfiguration {

    @MockBean
    private ContactEmailSearchRepository mockContactEmailSearchRepository;

}
