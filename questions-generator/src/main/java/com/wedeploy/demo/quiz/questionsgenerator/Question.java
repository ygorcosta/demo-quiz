package com.wedeploy.demo.quiz.questionsgenerator;

import java.util.List;

public class Question {

	private final String text;

	private final List<Answer> answers;

	public Question(String text, List<Answer> answers) {
		this.text = text;
		this.answers = answers;
	}

	public String getText() {
		return text;
	}

	public List<Answer> getAnswers() {
		return answers;
	}
}
