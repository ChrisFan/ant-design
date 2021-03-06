import React from 'react';
import classNames from 'classnames';
import { isCssAnimationSupported } from 'css-animation';

export default class Spin extends React.Component {
  isNestedPattern() {
    return !!(this.props && this.props.children);
  }

  render() {
    const { className, size, prefixCls, tip } = this.props;

    let spinClassName = classNames({
      [prefixCls]: true,
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [className]: !!className,
      [`${prefixCls}-spining`]: this.props.spining,
    });

    let spinElement;
    if (!isCssAnimationSupported || 'tip' in this.props) {
      // not support for animation, just use text instead
      spinElement = <div className={spinClassName}>{tip || '加载中...'}</div>;
    } else {
      spinElement = (
        <div className={spinClassName}>
          <span className={`${prefixCls}-dot ${prefixCls}-dot-first`} />
          <span className={`${prefixCls}-dot ${prefixCls}-dot-second`} />
          <span className={`${prefixCls}-dot ${prefixCls}-dot-third`} />
        </div>
      );
    }

    if (this.isNestedPattern()) {
      return (
        <div className={this.props.spining ? (`${prefixCls}-nested-loading`) : ''}>
          {spinElement}
          <div className={`${prefixCls}-container`}>
            {this.props.children}
          </div>
        </div>
      );
    }
    return spinElement;
  }
}

Spin.defaultProps = {
  prefixCls: 'ant-spin',
  spining: true,
};

Spin.propTypes = {
  className: React.PropTypes.string,
  size: React.PropTypes.oneOf(['small', 'default', 'large']),
};
