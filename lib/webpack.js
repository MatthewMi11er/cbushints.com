/* eslint-disable no-console */
import webpack from 'webpack';
import config from '../config/webpack';

export default function (done = () => {}) {
  const wp = webpack(config());

  wp.run((err) => {
    if (err) {
      throw err;
    }
    console.log('JS build complete!');
    done();
  });
}
