package com.groupProject.select_book;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {

    private final ChatClient chatClient;

    public ChatController(ChatClient.Builder chatClientBuilder) {
        this.chatClient=chatClientBuilder.build();
    }

    @GetMapping("/book")
    public String generate(@RequestParam(value="message", defaultValue="Whats your favorite book genres?") String message){
        String answer = chatClient.prompt()
                .user(message)
                .call()
                .content();
        return answer;
    }

}
