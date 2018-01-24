import React from 'react';
import CategoryCard from 'react-chatbot/CategoryCard';

import styles from './SupportCategoryCard.css';

const onCategorySelect = () => { };

/** Customer Support Category Card */
const SupportCategoryCard = () => (
  <CategoryCard
    className={styles.supportCard}
    name={'Customer Support'}
    shortName={'Support'}
    iconClass={styles.icon}
    onClick={onCategorySelect}
    value={'cust_support'}
    bgColor={'#f47321'}
    textColor={'white'}
    iconColor={'#f47321'}
  />
);

export default SupportCategoryCard;
