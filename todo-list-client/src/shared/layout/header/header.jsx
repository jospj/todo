import './header.css';

import React, {Component} from 'react';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { FaList, FaBook } from 'react-icons/lib/fa';

export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };
    }

    renderDevRibbon = () => {
        if (process.env.NODE_ENV === 'development') {
            return <div className="ribbon dev"><a href="">Development</a></div>
        } else if (process.env.NODE_ENV === 'test') {
            return <div className="ribbon dev"><a href="">Test</a></div>
        } else {
            return null;
        }
    }


    logo() {
        return(
            <h1 className='header--logo-wrap'>
                <Link to="/">
                    <div className='header--logo'>
                        <span className='hide-text' title='Emirates' href=''>Emirates</span>
                    </div>
                </Link>
            </h1>
        )
    }

    renderTitle() {
        return (
            <div className='header--title'> </div>
        )
    }

    renderLink(name, link, Icon, className, iconProps){
        return (
            <li className={`header--util__li ${className}`}>
                <Link to={link}>
                    <Icon { ...iconProps } /> {name}
                </Link>
            </li>
        )
    }

    renderLinks() {
        return (
            <nav className='header--util'>
                <ul>
                    {/*this.renderLink('Home', '/telex-message', FaList)}
                    {this.renderLink('Documentation', '/admin/docs', FaBook, 'header--util--documentation')*/}
                </ul>
            </nav>
        )
    }

    render() {

        return (
            <header className='header--main'>
                {/*this.renderDevRibbon()*/}
                <LoadingBar className="loading-bar"/>
                <div className='header--logged-in'>
                    {this.logo()}
                    {this.renderTitle()}
                    {this.renderLinks()}
                </div>
            </header>
        );
    }
}

export default Header;