package net.savantly.coach.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of AddressSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class AddressSearchRepositoryMockConfiguration {

    @MockBean
    private AddressSearchRepository mockAddressSearchRepository;

}
