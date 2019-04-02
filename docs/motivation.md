# Objective

> In an ideal world, what would the perfect document look like? Do you have examples or 
  recommendations of how documents could be formatted to get better results? The reason 
  I ask is to try understand whether there is an easier way to provide answers other than 
  curated flows that require complex configuration. The justification being that it’s 
  cheaper and easier for Legal to reformat documents than it is to continuously 
  configure/reconfigure conversation flows.

I'm glad you asked. Documents have a number of issues:

* They mix task-orientated answers with context such as background, in-depth discussion and
  so forth.
* Documents are designed for humans to read given time. They tend to collect as much information
  known about a given topic to serve multiple purposes.
* They therefore take time to read, better suited to consumption outside task-specific or
  customer-facing work flows.
* Formatting and content is mixed together, making it difficult for a machine to read.

To date, documents have generally been the unit of knowledge. Whether a Word document, a PDF
or a Web Page - the paradigm has been the same. Search technology and information retrieval
methods have focused on finding relevant documents to a query. Users must then sift through
the document to find what they need. Various approaches to extracting relevant chunks of
information from documents, highlighting relevant passages or summarising content have
mixed success depending on cleanliness of format, length, and various forms of annotation
and tagging. Most techniques start from the assumption that documents are as given, and
we'll do our best to get the relevant information.

You are right that by revisiting how content is authored we can start to address some of the
above shortcomings. I believe that we can work backwards from information retrieval methods
to optimise content creation taking into account:

1. Content is used for various task-specific purposes and should be malleable for these 
   purposes. For example, the needs of handling support enquiries is different from the
   needs of research and education.
2. Content is going to be served via multiple interfaces. For example, a messaging application
   requires content in a different format than a web application used to explore a given
   topic.
3. Machines as well as humans will read content to facilitate the above considerations.

There is prior art in busting the document paradigm. For example, earlier work on Hypertext
that led to the World Wide Web and HTML, and also on the Semantic Web, which had similar
goals to enable a more fluid discovery and navigation of information making greater use of
multimedia such as image, sound and video. There has also been attempts to create structured
document standards such as the [Darwin Information Typing Architecture (DITA)](https://en.wikipedia.org/wiki/Darwin_Information_Typing_Architecture),
[DITA Lite](http://docs.oasis-open.org/dita/LwDITA/v1.0/cnprd01/LwDITA-v1.0-cnprd01.html),
[DocBook](https://www.slideshare.net/abelsp/docbook-vs-dita-will-the-real-standard-please-stand-up).
These standards have been applied to technical writing in areas such as engineering product 
specifications and publishing. These standards have authored content using XML.

While there are relevant lessons, a simpler model is required to take a next step in getting 
'the right information to the right people at the right time.'

We can combine lessons from:

1. DITA and similar prior work in a simplified form
2. Virtual Assistant design - use of Intent and Entities to determine responses from
   natural language enquiries
3. NLP and machine learning approaches to question answering including: Named Entity
   Recognition, Recurrent Neural Networks or Attention using SQuAD formatted training
   sets (question-answer format), knowledge graphs, and unsupervised learning to train
   word vectors. 


# Proposed Design

