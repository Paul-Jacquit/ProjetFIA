package projetfia.web.rest;

import projetfia.ProjetFiaApp;
import projetfia.domain.Drive;
import projetfia.repository.DriveRepository;
import projetfia.web.rest.errors.ExceptionTranslator;

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
 * Integration tests for the {@link DriveResource} REST controller.
 */
@SpringBootTest(classes = ProjetFiaApp.class)
public class DriveResourceIT {

    @Autowired
    private DriveRepository driveRepository;

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

    private MockMvc restDriveMockMvc;

    private Drive drive;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DriveResource driveResource = new DriveResource(driveRepository);
        this.restDriveMockMvc = MockMvcBuilders.standaloneSetup(driveResource)
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
    public static Drive createEntity(EntityManager em) {
        Drive drive = new Drive();
        return drive;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Drive createUpdatedEntity(EntityManager em) {
        Drive drive = new Drive();
        return drive;
    }

    @BeforeEach
    public void initTest() {
        drive = createEntity(em);
    }

    @Test
    @Transactional
    public void getAllDrives() throws Exception {
        // Initialize the database
        driveRepository.saveAndFlush(drive);

        // Get all the driveList
        restDriveMockMvc.perform(get("/api/drives?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(drive.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getDrive() throws Exception {
        // Initialize the database
        driveRepository.saveAndFlush(drive);

        // Get the drive
        restDriveMockMvc.perform(get("/api/drives/{id}", drive.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(drive.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDrive() throws Exception {
        // Get the drive
        restDriveMockMvc.perform(get("/api/drives/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }
}
