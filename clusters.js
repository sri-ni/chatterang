import cluster from 'cluster';
import os from 'os';

const countCpus = os.cpus();

if (cluster.isMaster) {
  countCpus.forEach(() => cluster.fork());
  cluster.on('listening', worker => {
    console.log('cluster %d is connected', worker.process.pid);
  });
  cluster.on('disconnect', worker => {
    console.log('cluster %d is disconnected', worker.process.pid);
  });
  cluster.on('exit', worker => {
    console.log('cluster %d is dead', worker.process.pid);
    cluster.fork();
  });
} else {
  require('./index');
}
