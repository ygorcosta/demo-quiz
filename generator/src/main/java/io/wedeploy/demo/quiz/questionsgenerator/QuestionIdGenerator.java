package io.wedeploy.demo.quiz.questionsgenerator;

public class QuestionIdGenerator {

	private int id;

	public QuestionIdGenerator(int initialValue) {
		this.id = initialValue;
	}

	public int nextId() {
		return id++;
	}

}
