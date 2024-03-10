from vectorshift.node import *
from vectorshift.pipeline import *
import dotenv
import os

load_dotenv()

PUBLIC_KEY = os.getenv("VECTORSHIFT_PUBLIC_KEY")
PRIVATE_KEY = os.getenv("VECTORSHIFT_PRIVATE_KEY")

config = vectorshift.deploy.Config(
    public_key=PUBLIC_KEY,
    private_key=PRIVATE_KEY
)

with open("test.txt", "r") as file:
    file_contents = file.read()

print(file_contents)

input_node = InputNode(name="diff", input_type="text")

question_text = TextNode(text="What changes have been made in this diff?")

vector_query = VectorQueryNode(
    query_input=[question_text.output()],
    documents_input=[input_node.output()]
)

system_text_raw = """
Input:

A unified diff file containing changes made in the codebase.
Task:
Generate a descriptive pull request description based on the provided diff file. 
Your description should be in Markdown format.
Your description should include a brief overview of the changes, the motivation behind them, potential impacts, and guidance for reviewers.

Instructions:

Brief Overview of Changes: Summarize the changes introduced by the diff file, highlighting the key modifications made to the codebase.

Motivation Behind Changes: Explain the rationale behind the changes, including any bugs addressed, new features implemented, or improvements made to existing code.

Impacts on Functionality and Performance: Discuss any potential impacts the changes may have on functionality, performance, or other relevant aspects of the codebase.

Guidance for Reviewers: Provide guidance for reviewers on what aspects of the code to focus on during the review process, such as specific areas of concern or important considerations.

Additional Information:

Aim for clarity, coherence, and conciseness in the generated description to effectively communicate the significance and context of the changes to reviewers.
Use professional language and tone appropriate for communication within a development team.
Emphasize the importance of maintaining consistent formatting and structure in the generated pull request descriptions.
Note:
Changes to test fixtures, image, and binary files should be addressed with less emphasis compared to code changes.
"""

system_text = TextNode(text=system_text_raw)

llm = OpenAILLMNode(
    model="gpt-4",
    system_input=system_text.output(),
    prompt_input=vector_query.output()
)

output = OutputNode(
    name="output_1",
    output_type="text",
    input=llm.output()
)

pr_gen_pipeline_nodes = [
    input_node, question_text, vector_query,
    system_text, llm, output
]

pr_gen_pipeline = Pipeline.fetch(
    pipeline_name="Pull Request Generator",
    username="fetusslave",
    public_key=PUBLIC_KEY,
    private_key=PRIVATE_KEY
)
print(pr_gen_pipeline.nodes)

response = pr_gen_pipeline.run(
    {"diff": file_contents},

)

print(response.values())