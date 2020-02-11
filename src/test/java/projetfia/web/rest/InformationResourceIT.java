package projetfia.web.rest;

import projetfia.ProjetFiaApp;
import projetfia.domain.Information;
import projetfia.repository.InformationRepository;
import projetfia.service.InformationService;
import projetfia.web.rest.errors.ExceptionTranslator;
import projetfia.service.dto.InformationCriteria;
import projetfia.service.InformationQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static projetfia.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link InformationResource} REST controller.
 */
@SpringBootTest(classes = ProjetFiaApp.class)
public class InformationResourceIT {

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private InformationRepository informationRepository;

    @Autowired
    private InformationService informationService;

    @Autowired
    private InformationQueryService informationQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restInformationMockMvc;

    private Information information;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InformationResource informationResource = new InformationResource(informationService, informationQueryService);
        this.restInformationMockMvc = MockMvcBuilders.standaloneSetup(informationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Information createEntity(EntityManager em) {
        Information information = new Information()
            .titre(DEFAULT_TITRE)
            .description(DEFAULT_DESCRIPTION);
        return information;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Information createUpdatedEntity(EntityManager em) {
        Information information = new Information()
            .titre(UPDATED_TITRE)
            .description(UPDATED_DESCRIPTION);
        return information;
    }

    @BeforeEach
    public void initTest() {
        information = createEntity(em);
    }

    @Test
    @Transactional
    public void createInformation() throws Exception {
        int databaseSizeBeforeCreate = informationRepository.findAll().size();

        // Create the Information
        restInformationMockMvc.perform(post("/api/information")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(information)))
            .andExpect(status().isCreated());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeCreate + 1);
        Information testInformation = informationList.get(informationList.size() - 1);
        assertThat(testInformation.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testInformation.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createInformationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = informationRepository.findAll().size();

        // Create the Information with an existing ID
        information.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInformationMockMvc.perform(post("/api/information")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(information)))
            .andExpect(status().isBadRequest());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInformation() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList
        restInformationMockMvc.perform(get("/api/information?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(information.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getInformation() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get the information
        restInformationMockMvc.perform(get("/api/information/{id}", information.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(information.getId().intValue()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }


    @Test
    @Transactional
    public void getInformationByIdFiltering() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        Long id = information.getId();

        defaultInformationShouldBeFound("id.equals=" + id);
        defaultInformationShouldNotBeFound("id.notEquals=" + id);

        defaultInformationShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultInformationShouldNotBeFound("id.greaterThan=" + id);

        defaultInformationShouldBeFound("id.lessThanOrEqual=" + id);
        defaultInformationShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllInformationByTitreIsEqualToSomething() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList where titre equals to DEFAULT_TITRE
        defaultInformationShouldBeFound("titre.equals=" + DEFAULT_TITRE);

        // Get all the informationList where titre equals to UPDATED_TITRE
        defaultInformationShouldNotBeFound("titre.equals=" + UPDATED_TITRE);
    }

    @Test
    @Transactional
    public void getAllInformationByTitreIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList where titre not equals to DEFAULT_TITRE
        defaultInformationShouldNotBeFound("titre.notEquals=" + DEFAULT_TITRE);

        // Get all the informationList where titre not equals to UPDATED_TITRE
        defaultInformationShouldBeFound("titre.notEquals=" + UPDATED_TITRE);
    }

    @Test
    @Transactional
    public void getAllInformationByTitreIsInShouldWork() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList where titre in DEFAULT_TITRE or UPDATED_TITRE
        defaultInformationShouldBeFound("titre.in=" + DEFAULT_TITRE + "," + UPDATED_TITRE);

        // Get all the informationList where titre equals to UPDATED_TITRE
        defaultInformationShouldNotBeFound("titre.in=" + UPDATED_TITRE);
    }

    @Test
    @Transactional
    public void getAllInformationByTitreIsNullOrNotNull() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList where titre is not null
        defaultInformationShouldBeFound("titre.specified=true");

        // Get all the informationList where titre is null
        defaultInformationShouldNotBeFound("titre.specified=false");
    }
                @Test
    @Transactional
    public void getAllInformationByTitreContainsSomething() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList where titre contains DEFAULT_TITRE
        defaultInformationShouldBeFound("titre.contains=" + DEFAULT_TITRE);

        // Get all the informationList where titre contains UPDATED_TITRE
        defaultInformationShouldNotBeFound("titre.contains=" + UPDATED_TITRE);
    }

    @Test
    @Transactional
    public void getAllInformationByTitreNotContainsSomething() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList where titre does not contain DEFAULT_TITRE
        defaultInformationShouldNotBeFound("titre.doesNotContain=" + DEFAULT_TITRE);

        // Get all the informationList where titre does not contain UPDATED_TITRE
        defaultInformationShouldBeFound("titre.doesNotContain=" + UPDATED_TITRE);
    }


    @Test
    @Transactional
    public void getAllInformationByDescriptionIsEqualToSomething() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList where description equals to DEFAULT_DESCRIPTION
        defaultInformationShouldBeFound("description.equals=" + DEFAULT_DESCRIPTION);

        // Get all the informationList where description equals to UPDATED_DESCRIPTION
        defaultInformationShouldNotBeFound("description.equals=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllInformationByDescriptionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList where description not equals to DEFAULT_DESCRIPTION
        defaultInformationShouldNotBeFound("description.notEquals=" + DEFAULT_DESCRIPTION);

        // Get all the informationList where description not equals to UPDATED_DESCRIPTION
        defaultInformationShouldBeFound("description.notEquals=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllInformationByDescriptionIsInShouldWork() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList where description in DEFAULT_DESCRIPTION or UPDATED_DESCRIPTION
        defaultInformationShouldBeFound("description.in=" + DEFAULT_DESCRIPTION + "," + UPDATED_DESCRIPTION);

        // Get all the informationList where description equals to UPDATED_DESCRIPTION
        defaultInformationShouldNotBeFound("description.in=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllInformationByDescriptionIsNullOrNotNull() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList where description is not null
        defaultInformationShouldBeFound("description.specified=true");

        // Get all the informationList where description is null
        defaultInformationShouldNotBeFound("description.specified=false");
    }
                @Test
    @Transactional
    public void getAllInformationByDescriptionContainsSomething() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList where description contains DEFAULT_DESCRIPTION
        defaultInformationShouldBeFound("description.contains=" + DEFAULT_DESCRIPTION);

        // Get all the informationList where description contains UPDATED_DESCRIPTION
        defaultInformationShouldNotBeFound("description.contains=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllInformationByDescriptionNotContainsSomething() throws Exception {
        // Initialize the database
        informationRepository.saveAndFlush(information);

        // Get all the informationList where description does not contain DEFAULT_DESCRIPTION
        defaultInformationShouldNotBeFound("description.doesNotContain=" + DEFAULT_DESCRIPTION);

        // Get all the informationList where description does not contain UPDATED_DESCRIPTION
        defaultInformationShouldBeFound("description.doesNotContain=" + UPDATED_DESCRIPTION);
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultInformationShouldBeFound(String filter) throws Exception {
        restInformationMockMvc.perform(get("/api/information?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(information.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));

        // Check, that the count call also returns 1
        restInformationMockMvc.perform(get("/api/information/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultInformationShouldNotBeFound(String filter) throws Exception {
        restInformationMockMvc.perform(get("/api/information?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restInformationMockMvc.perform(get("/api/information/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingInformation() throws Exception {
        // Get the information
        restInformationMockMvc.perform(get("/api/information/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInformation() throws Exception {
        // Initialize the database
        informationService.save(information);

        int databaseSizeBeforeUpdate = informationRepository.findAll().size();

        // Update the information
        Information updatedInformation = informationRepository.findById(information.getId()).get();
        // Disconnect from session so that the updates on updatedInformation are not directly saved in db
        em.detach(updatedInformation);
        updatedInformation
            .titre(UPDATED_TITRE)
            .description(UPDATED_DESCRIPTION);

        restInformationMockMvc.perform(put("/api/information")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInformation)))
            .andExpect(status().isOk());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeUpdate);
        Information testInformation = informationList.get(informationList.size() - 1);
        assertThat(testInformation.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testInformation.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingInformation() throws Exception {
        int databaseSizeBeforeUpdate = informationRepository.findAll().size();

        // Create the Information

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInformationMockMvc.perform(put("/api/information")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(information)))
            .andExpect(status().isBadRequest());

        // Validate the Information in the database
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInformation() throws Exception {
        // Initialize the database
        informationService.save(information);

        int databaseSizeBeforeDelete = informationRepository.findAll().size();

        // Delete the information
        restInformationMockMvc.perform(delete("/api/information/{id}", information.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Information> informationList = informationRepository.findAll();
        assertThat(informationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
