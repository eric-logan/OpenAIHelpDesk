# OpenAIHelpDesk
Uses OpenAI to answer helpdesk tickets

# Training Data
openai tools fine_tunes.prepare_data -f answer.jsonl # Reformats data for openai model

openai api fine_tunes.create -t "answer_prepared.jsonl" -m ada --n_epochs 50 # Fine tune data and train the openai model
<br />-t = <TRAIN_FILE_ID_OR_PATH>
<br />-m = <BASE_MODEL>
<br />--n_epochs = The number of epochs to train the model for. An epoch refers to one full cycle through the training dataset.

# Start flask web server
python -m flask
