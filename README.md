# efg-keys

Electronic Field Guide web application

## Prerequisites

Make sure you have [Node.js](http://nodejs.org/) installed. If on Ubuntu/Debian install via the following:

    sudo apt-get install curl

    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y nodejs

Test that node installed successfully by checking version:

    node -v

Also requires the MongoDB database:

    sudo apt-get install mongodb
    
## Installing

Clone the project via git:

    git clone https://github.com/electronicfieldguide/efg3.git

Run the node package manager from the root of the project directory to install dependencies:

    cd efg3
    npm install

## Running

Start the web server:

    npm start

Visit [http://localhost:3000](http://localhost:3000) to view the front page.