module.exports =  function () {
return `
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'shineout';
import Icon from '@shein-components/Icon';
import { t } from 'rrc-loader-helper';
import styles from '@src/component/style.css';
import store from '../reducers';


class Handle extends React.Component {
  render() {
    const {
      loading,
    } = this.props;
    return (
      <section className={styles.handle}>
        <Button
          type="primary"
          disabled={!loading}
          onClick={() => {
            store.exportData();
          }}
        >
          <Icon name="download" style={{ marginRight: 6 }} />
          {t('导出')}
        </Button>
      </section>
    );
  }
}

Handle.propTypes = {
  loading: PropTypes.number,
};
export default Handle;
  
` }