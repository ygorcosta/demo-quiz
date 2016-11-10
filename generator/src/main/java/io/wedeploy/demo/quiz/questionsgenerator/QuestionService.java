package io.wedeploy.demo.quiz.questionsgenerator;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class QuestionService {

	@Value(value = "classpath:qa.json")
	private Resource questionsJson;

	private QuestionIdGenerator questionIdGenerator;
	private List<Question> questions;

	@PostConstruct
	public void init() throws IOException {
		try (InputStream inputStream = questionsJson.getInputStream()) {
			ObjectMapper mapper = new ObjectMapper();
			List<List<?>> rawData = mapper.readValue(inputStream, List.class);

			questionIdGenerator = new QuestionIdGenerator(100);

			questions = rawData
				.stream()
				.map(this::parseQuestion)
				.collect(Collectors.toList());
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	/**
	 * Returns predefined list of questions and answers.
	 */
	public List<Question> getQuestions() {
		return questions;
	}

	private Question parseQuestion(List<?> data) {
		int id = questionIdGenerator.nextId();
		String question = (String) data.get(0);
		List<Answer> answers = new ArrayList<>(data.size() - 1);

		for (int i = 1; i < data.size(); i++) {
			List<String> arrayAndDescription = (List<String>) data.get(i);

			answers.add(new Answer(
				arrayAndDescription.get(0),
				arrayAndDescription.get(1),
				i == 1));
		}

		return new Question(id, question, answers);
	}

}
