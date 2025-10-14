package com.mainak.springaidemo.service;

import java.util.List;
import java.util.Map;

import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.content.Media;
import org.springframework.ai.google.genai.GoogleGenAiChatModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.multipart.MultipartFile;

import com.mainak.springaidemo.dto.ChatPrompt;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class GeminiChatService {
    private final GoogleGenAiChatModel geminiModel;
    private final ChatMemory chatMemory;


    public ResponseEntity<Map<String, String>> getChatResponse(ChatPrompt chatPrompt, MultipartFile image) throws Exception {
        long startTime = System.currentTimeMillis();

        // If image is present, create a message with image
        if(image != null && !image.isEmpty()){
            var imageBytes = image.getBytes();
            var imageMessage = UserMessage.builder()
                    .text(chatPrompt.getPrompt())
                    .media(List.of(Media.builder().data(imageBytes).mimeType(MimeTypeUtils.IMAGE_JPEG).build()))
                    .build();
            chatMemory.add(chatPrompt.getUserId(), imageMessage);
        }else{
            UserMessage chatMessage = new UserMessage(chatPrompt.getPrompt());
            chatMemory.add(chatPrompt.getUserId(), chatMessage);
        }
        // History based chat with AI
        ChatResponse response = this.geminiModel.call(new Prompt(chatMemory.get(chatPrompt.getUserId())));

        chatMemory.add(chatPrompt.getUserId(), response.getResult().getOutput());

        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;

        String responseText = response.getResult().getOutput().getText();

        // If response is null, return error
        if(responseText == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "No response from model"));
        }
        Map<String, String> responseMap = Map.of("response", responseText, "timeTaken", String.valueOf(duration / 1000.0) + " seconds");
        return ResponseEntity.ok(responseMap);
    }
}
