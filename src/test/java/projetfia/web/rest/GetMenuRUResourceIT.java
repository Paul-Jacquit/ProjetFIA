package projetfia.web.rest;

import projetfia.ProjetFiaApp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the GetMenuRUResource REST controller.
 *
 * @see GetMenuRUResource
 */
@SpringBootTest(classes = ProjetFiaApp.class)
public class GetMenuRUResourceIT {

    private MockMvc restMockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        GetMenuRUResource getMenuRUResource = new GetMenuRUResource();
        restMockMvc = MockMvcBuilders
            .standaloneSetup(getMenuRUResource)
            .build();
    }

    /**
     * Test getMenuGouvURL
     */
    @Test
    public void testGetMenuGouvURL() throws Exception {
        restMockMvc.perform(get("/api/get-menu-ru/get-menu-gouv-url"))
            .andExpect(status().isOk());
    }
}
