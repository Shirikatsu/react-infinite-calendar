import React, {PureComponent} from 'react';
import classNames from 'classnames';
import parse from 'date-fns/parse';
import styles from './Day.scss';

export default class Day extends PureComponent {
  handleClick = () => {
    let {date, isDisabled, slotType, onClick} = this.props;

    if (!isDisabled && slotType !== 1 && typeof onClick === 'function') {
      onClick(parse(date));
    }
  };

  renderSelection(selectionColor) {
    const {
      day,
      date,
      isToday,
      slotType,
      locale: {todayLabel},
      monthShort,
      theme: {textColor},
      selectionStyle,
    } = this.props;

    return (
      <div
        className={styles.selection}
        data-date={date}
        style={{
          backgroundColor: this.selectionColor,
          color: textColor.active,
          ...selectionStyle,
        }}
      >
        <span className={styles.month}>
          {isToday ? todayLabel.short || todayLabel.long : monthShort}
        </span>
        <span className={styles.day}>{day}</span>
      </div>
    );
  }
  
  render() {
    const {
      className,
      currentYear,
      date,
      day,
      handlers,
      isDisabled,
      slotType,
      isHighlighted,
      isToday,
      isSelected,
      monthShort,
      theme: {selectionColor, dayFullColor, dayAvailableColor, dayFillingColor, todayColor},
      year,
    } = this.props;
    let color;

    if (isSelected) {
      color = this.selectionColor = typeof selectionColor === 'function'
        ? selectionColor(date)
        : selectionColor;
    } else if (isToday) {
      color = todayColor;
    } else if (slotType == 1) {
      color =  dayFullColor;
    } else if (slotType == 2) {
      color = dayAvailableColor;
    } else if (slotType == 3) {
      color = dayAvailableColor;
    }
    
    if (isDisabled) {
      color = '#AAA'
    }

    return (
      <li
        style={color ? {color} : null}
        className={classNames(styles.root, {
          [styles.today]: isToday || slotType == 3,
          [styles.highlighted]: isHighlighted,
          [styles.selected]: isSelected,
          [styles.disabled]: isDisabled || slotType == 1,
          [styles.enabled]: !isDisabled,
        }, className)}
        onClick={this.handleClick}
        data-date={date}
        {...handlers}
      >

        
          {day === 1 && <span className={styles.month}><div style={{fontWeight:'400'}}>{monthShort}</div></span>}
          {isToday ? <span><div style={{fontWeight:'400'}}>{day}</div></span> : <div style={{fontWeight:'400'}}>{day}</div>}
          {day === 1 &&
            currentYear !== year &&
            <span className={styles.year}><div style={{fontWeight:'400'}}>{year}</div></span>}
        
        {isSelected && this.renderSelection()}
      </li>
    );
  }
}
