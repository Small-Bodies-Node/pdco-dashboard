import React from 'react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor, faShieldAlt, faTable, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

import { ImageCell } from '../ImageCell';
import { useStyles } from './styles';
import { Clocks } from '../Clocks';
import { Sentry } from '../Sentry';
import { ProgramsMap } from '../ProgramsMap';
import { NeoCount } from '../NeoCount';
import { TitledCell } from '../TitledCell';
import { Link } from 'react-router-dom';

export const MainUI = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.imageLeft}>
        <ImageCell imageUrl="images/pdco-logo.jpg" />
      </div>
      <div className={classes.imageRight}>
        <ImageCell imageUrl="images/nasa-logo.png" />
      </div>
      <div className={classes.title}> Planetary Defense Coordination Office </div>
      <div className={classes.clocks}>
        <Clocks />
      </div>
      <div className={classes.neoCount}>
        <TitledCell title="CLOSE APPROACHES" icon={() => <FontAwesomeIcon icon={faMeteor} />}>
          <NeoCount />
        </TitledCell>
      </div>
      <div className={classes.sentry}>
        <TitledCell
          title={() => <a href="https://cneos.jpl.nasa.gov/sentry/">{'SENTRY STATUS'}</a>}
          icon={() => <FontAwesomeIcon icon={faShieldAlt} />}
        >
          <Sentry />
        </TitledCell>
      </div>
      <div className={classes.programs}>
        <TitledCell title="PROGRAMS" icon={() => <FontAwesomeIcon icon={faGlobeAmericas} />}>
          <ProgramsMap />
        </TitledCell>
      </div>
      <div className={classes.recentTab}>
        <TitledCell title="RECENT TABLE" icon={() => <FontAwesomeIcon icon={faTable} />}>
          ...
        </TitledCell>
      </div>
      <div className={classes.futureTab}>
        <TitledCell title="FUTURE TABLE" icon={() => <FontAwesomeIcon icon={faTable} />}>
          ...
        </TitledCell>
      </div>
    </div>
  );
};
