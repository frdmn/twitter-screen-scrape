// Generated by CoffeeScript 1.10.0
(function() {
  var ArgumentParser, JSONStream, TwitterPosts, argparser, argv, packageInfo, pump, stream;

  ArgumentParser = require('argparse').ArgumentParser;

  JSONStream = require('JSONStream');

  TwitterPosts = require('./');

  packageInfo = require('../package');

  pump = require('pump');

  argparser = new ArgumentParser({
    version: packageInfo.version,
    addHelp: true,
    description: packageInfo.description
  });

  argparser.addArgument(['--username', '-u'], {
    type: 'string',
    help: 'Username of the account to scrape',
    required: true
  });

  argparser.addArgument(['--no-retweets'], {
    action: 'storeFalse',
    help: 'Ignore retweets',
    defaultValue: true,
    dest: 'retweets'
  });

  argv = argparser.parseArgs();

  stream = new TwitterPosts(argv);

  pump(stream, JSONStream.stringify('[', ',\n', ']\n'), process.stdout, function(err) {
    if (err != null) {
      console.error(err.message);
      console.error(err.stack);
      return process.exit(1);
    }
  });

}).call(this);
