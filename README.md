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

## Deployment

To deploy for production on standard Linux, use apache and systemd with the following configuration. Example files
based on the instructions below are provided in the deploy directory of this project.

First create a systemd service file at `/lib/systemd/system/efg.service` with the following contents:

    [Unit]
    Description=EFG3 node.js app
    Documentation=http://efg.cs.umb.edu/
    After=network.target
    
    [Service]
    WorkingDirectory=/www/efg
    Environment=NODE_PORT=3000
    Type=simple
    ExecStart=/usr/bin/npm start
    Restart=on-failure
    
    [Install]
    WantedBy=multi-user.target

The above assumes that the project root is located in the /www/efg directory. To reload changes and start 
the service use the following commands

    sudo systemctl daemon-reload
    sudo systemctl start efg
    
In order to configure apache to serve the static assets and public html files first install the Apache modules 
proxy and proxy_http via the commands:

    sudo a2enmod proxy
    sudo a2enmod proxy_http

Restart Apache for the changes to take effect:

    sudo service apache2 restart

Create a new apache2 site configuration file at `/etc/apache2/sites-available/efg.conf` with the following contents:

    <VirtualHost *:80>
        ServerAdmin webmaster@localhost
    
        DocumentRoot /var/www/efg
        <Directory /var/www/efg>
            Options Indexes FollowSymLinks MultiViews
            AllowOverride None
            Order allow,deny
            allow from all
        </Directory>
    
        ProxyRequests Off
        ProxyPreserveHost On
        ProxyVia Full
        <Proxy *>
            Require all granted
        </Proxy>
    
        <Location /efg>
            ProxyPass http://127.0.0.1:3000
            ProxyPassReverse http://127.0.0.1:3000
        </Location>
    
        ErrorLog ${APACHE_LOG_DIR}/error.log
    
        # Possible values include: debug, info, notice, warn, error, crit,
        # alert, emerg.
        LogLevel warn
    
        CustomLog ${APACHE_LOG_DIR}/access.log combined
    
    </VirtualHost>

Enable the site as follows:

    sudo a2ensite 
    sudo service apache2 reload