package projetfia.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import projetfia.domain.Message;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.Date;
import java.util.List;

/**
 * ChatResource controller
 */
@RestController
@RequestMapping("/api")
public class ChatResource {
    private final Logger log = LoggerFactory.getLogger(ChatResource.class);
    /**
     * GET chat flag
     */
    @GetMapping("/messages/flag")
    public List<Message> getMessageFlag() {
        Boolean newMessage;

//        if(lastDateTime == MessageResource.lastDateTime)
//        {
//            newMessage=false;
//        }
//        else
//        {
//            newMessage=true;
//        }

        newMessage=true;
        /*
        String toreturn = "heyo je communique avec le serveur java spring";
        try {
            // creation d'un objet URL
            URL url = new URL("http://webservices-v2.crous-mobile.fr:8080/feed/bordeaux/externe/resto.xml");
            // on etablie une connection a cette url
            URLConnection uc = url.openConnection();
            // on y cree un flux de lecture
            InputStream in = uc.getInputStream();
            // on lit le premier bit
            int c = in.read();
            // on cree un StringBuilder pour par la suite y ajouter tout les bit lus
            StringBuilder build = new StringBuilder();
            // tant que c n'est pas egale au bit indiquant la fin d'un flux...
            while (c != -1) {
                build.append((char) c);
                // ...on l'ajoute dasn le StringBuilder...
                c = in.read();
                // ...on lit le suivant
            }
            // on retourne le code de la page
            toreturn = build.toString();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        log.debug("to return test= "+toreturn);
        */
       // return new ResponseEntity<List<Message>>(newMessage, HttpStatus.OK);
        return null;
    }
}
