# Majinhu-web

Majin Hu's website

## Development
##### Install modules
```bash
npm install
```

##### Configure development/production/test settings
Modify `config/[development|production|test].js` to configure settings for different mode. 

##### Configure web server to proxy to corresponding port (optional)
An example:

Add a new site in `/etc/apache2/sites-available/majinhu.com`

```apacheconf
<VirtualHost *:80>
  ServerAdmin cychi1210@gmail.com
  ServerName majinhu.com

  ProxyRequests off

  <Proxy *>
    Order deny,allow
    Allow from all
  </Proxy>

  <Location />
    ProxyPass http://localhost:4000/
    ProxyPassReverse http://localhost:4000/
  </Location>
</VirtualHost>
```

Enable it

```bash
sudo a2ensite majinhu.com
```

##### Install forever (optional)
https://github.com/nodejitsu/forever

##### Compile assets (for production)
```bash
make assets
```

##### Run the server
 - Run the server in development mode (default): `make s` or `make fs` (if want to use forever)
 - Run the server in production mode: `make sp` or `make fsp` (if want to use forever)
 - Run the server in test mode: `make st` or `make fst` (if want to use forever)
