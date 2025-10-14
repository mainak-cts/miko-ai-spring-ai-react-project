package com.mainak.springaidemo.controller;

import com.mainak.springaidemo.dto.ChatPrompt;
import com.mainak.springaidemo.service.GeminiChatService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/gemini")
@CrossOrigin("http://localhost:5173/")
@AllArgsConstructor
public class GeminiChatController {
    private final GeminiChatService chatService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chatResponse(@RequestPart ChatPrompt chatPrompt, @RequestPart MultipartFile image) throws Exception {
        return chatService.getChatResponse(chatPrompt, image);
    }
}
