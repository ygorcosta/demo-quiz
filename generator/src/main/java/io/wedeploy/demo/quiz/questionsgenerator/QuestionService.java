package io.wedeploy.demo.quiz.questionsgenerator;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Service
public class QuestionService {

	@Value(value = "classpath:qa.json")
	private Resource questionsJson;

	private List<List<?>> questionsAndAnswers;

	@PostConstruct
	public void init() throws IOException {
		try (InputStream inputStream = questionsJson.getInputStream()) {
			ObjectMapper mapper = new ObjectMapper();
			questionsAndAnswers = mapper.readValue(inputStream, List.class);
		}
		catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	/**
	 * Returns predefined list of questions and answers.
	 */
	public List<List<?>> getQuestionsAndAnswers() {
		return questionsAndAnswers;
	}

}
