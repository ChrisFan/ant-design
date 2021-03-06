import React, { cloneElement } from 'react';

/* Exported as Breadcrumb.Item */
class BreadcrumbItem extends React.Component {
  render() {
    const { prefixCls, separator, children } = this.props;
    let link = <a className={`${prefixCls}-link`} {...this.props}>{children}</a>;
    if (typeof this.props.href === 'undefined') {
      link = <span className={`${prefixCls}-link`} {...this.props}>{children}</span>;
    }
    return (
      <span>
        {link}
        <span className={`${prefixCls}-separator`}>{separator}</span>
      </span>
    );
  }
}

BreadcrumbItem.defaultProps = {
  prefixCls: 'ant-breadcrumb',
  separator: '/',
};

BreadcrumbItem.propTypes = {
  prefixCls: React.PropTypes.string,
  separator: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  href: React.PropTypes.string,
};

export default class Breadcrumb extends React.Component {
  render() {
    let crumbs;
    const { separator, prefixCls, routes, params, children, linkRender } = this.props;
    if (routes && routes.length > 0) {
      const paths = [];
      crumbs = routes.map((route, i) => {
        if (!route.breadcrumbName) {
          return null;
        }
        const name = route.breadcrumbName.replace(/\:(.*)/g, (replacement, key) => {
          return params[key] || replacement;
        });

        let link;
        let path = route.path.replace(/^\//, '');
        Object.keys(params).forEach(key => {
          path = path.replace(`:${key}`, params[key]);
        });
        if (path) {
          paths.push(path);
        }

        if (i === routes.length - 1) {
          link = <span>{name}</span>;
        } else {
          link = linkRender(`/${paths.join('/')}`, name);
        }
        return <BreadcrumbItem separator={separator} key={name}>{link}</BreadcrumbItem>;
      });
    } else {
      crumbs = React.Children.map(children, (element, index) => {
        return cloneElement(element, {
          separator,
          key: index,
        });
      });
    }
    return (
      <div className={prefixCls}>
        {crumbs}
      </div>
    );
  }
}

Breadcrumb.defaultProps = {
  prefixCls: 'ant-breadcrumb',
  separator: '/',
  linkRender: (href, name) => <a href={`#${href}`}>{name}</a>,
};

Breadcrumb.propTypes = {
  prefixCls: React.PropTypes.string,
  separator: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
  routes: React.PropTypes.array,
  params: React.PropTypes.object,
};

Breadcrumb.Item = BreadcrumbItem;
