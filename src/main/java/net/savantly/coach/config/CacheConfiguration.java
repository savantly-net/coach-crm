package net.savantly.coach.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(net.savantly.coach.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(net.savantly.coach.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.EntityAuditEvent.class.getName(), jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.Site.class.getName(), jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.Contact.class.getName(), jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.Contact.class.getName() + ".phoneNumbers", jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.Contact.class.getName() + ".emailAddresses", jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.Upload.class.getName(), jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.FieldServiceType.class.getName(), jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.FieldServiceType.class.getName() + ".fieldServiceRequests", jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.FieldServiceRequest.class.getName(), jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.FieldServiceRequest.class.getName() + ".documents", jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.Site.class.getName() + ".otherContacts", jcacheConfiguration);
            cm.createCache(net.savantly.coach.domain.FieldServiceType.class.getName() + ".requestTypes", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
