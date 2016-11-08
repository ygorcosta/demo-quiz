package com.wedeploy.demo.quiz.questionsgenerator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
public class QuestionsController {

	private static final Logger log = LoggerFactory.getLogger(QuestionsController.class);

	@Autowired
	private QuestionService questionService;

	@RequestMapping("/questions")
	public List<Question> questions(
			@RequestParam(value="random", defaultValue="true") boolean random) {

		List<Question> questionList = new ArrayList<>();

		questionService.getQuestionsAndAnswers().forEach((List<String> data) -> {
			List<Answer> answers = new ArrayList<>(data.size() - 1);

			for (int i = 1; i < data.size(); i++) {
				answers.add(new Answer(data.get(i), i == 1));
			}

			if (random) {
				Collections.shuffle(answers);
			}

			questionList.add(new Question(data.get(0), answers));
		});

		if (random) {
			Collections.shuffle(questionList);
		}

		log.debug("Questions provided: " + questionList.size());

		return questionList;
	}
}