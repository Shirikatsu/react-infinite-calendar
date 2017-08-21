import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import classNames from 'classnames';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import styles from './Header.scss';
import animation from './Animation.scss';

const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function defaultSelectionRenderer(value, {
  display,
  key,
  locale: {locale},
  dateFormat,
  onYearClick,
  scrollToDate,
  setDisplay,
  shouldAnimate,
}, type) {
  const date = parse(value);

  if (type == 1) {
    const values = date && [
      {
        active: display === 'years',
        handleClick: e => {
          onYearClick(date, e, key);
          setDisplay('years');
        },
        item: 'year',
        title: display === 'days' ? `Change year` : null,
        value: date.getFullYear(),
      },
      {
        active: display === 'days',
        handleClick: e => {
          if (display !== 'days') {
            setDisplay('days');
          } else if (date) {
            scrollToDate(date, -40, true);
          }
        },
        item: 'day',
        title: display === 'days'
          ? `Scroll to ${format(date, dateFormat, {locale})}`
          : null,
        value: format(date, dateFormat, {locale}),
      },
    ];
  
    return (
      <div
        key={key}
        className={styles.wrapper}
        aria-label={format(date, dateFormat + ' YYYY', {locale})}
      >
        {values.map(({handleClick, item, key, value, active, title}) => {
          return (
            <div
              key={item}
              className={classNames(styles.dateWrapper, styles[item], {
                [styles.active]: active,
              })}
              title={title}
            >
              <CSSTransitionGroup
                transitionName={animation}
                transitionEnterTimeout={250}
                transitionLeaveTimeout={250}
                transitionEnter={shouldAnimate}
                transitionLeave={shouldAnimate}
              >
                <span
                  key={`${item}-${value}`}
                  className={styles.date}
                  aria-hidden={true}
                  onClick={handleClick}
                >
                  {value}
                </span>
              </CSSTransitionGroup>
            </div>
          );
        })}
      </div>
    );
  } else {
    const values = date && [
      {
        active: display === 'years',
        item: 'year',
        value: date.getFullYear(),
      },
      {
        active: display === 'days',
        item: 'day',
        value: fullMonths[date.getMonth()]
      },
    ];
    
    return (
      <div
        key={key}
        className={styles.wrapper}
        aria-label={value}
      >
        {values.map(({item, key, value, active}) => {
          return (
            <div
              key={item}
              className={classNames(styles.dateWrapper, styles[item], {
                [styles.active]: active,
              })}
            >
              <CSSTransitionGroup
                transitionName={animation}
                transitionEnterTimeout={250}
                transitionLeaveTimeout={250}
                transitionEnter={shouldAnimate}
                transitionLeave={shouldAnimate}
              >
                <span
                  key={`${item}-${value}`}
                  className={styles.date}
                  aria-hidden={true}
                >
                  {value}
                </span>
              </CSSTransitionGroup>
            </div>
          );
        })}
      </div>
    );
  }
  
}
