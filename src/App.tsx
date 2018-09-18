/*
* This file demonstrates a basic ReactXP app.
*/

import RX = require('reactxp');
import Navigator, { Types as NavigatorTypes } from 'reactxp-navigation'

import MainPanel = require('./MainPanel');
import SecondPanel = require('./SecondPanel');

enum NavigationRouteId {
    MainPanel,
    SecondPanel
}

const styles = {
    navCardStyle: RX.Styles.createViewStyle({
        backgroundColor: '#f5fcff'
    })
};

class App extends RX.Component<{}, null> {
    private _navigator: Navigator;

    componentDidMount() {
        this._navigator.immediatelyResetRouteStack([{
            routeId: NavigationRouteId.MainPanel,
            sceneConfigType: NavigatorTypes.NavigatorSceneConfigType.Fade
        }]);
    }

    render() {
        return (
            <Navigator
                ref={ this._onNavigatorRef }
                renderScene={ this._renderScene }
                cardStyle={ styles.navCardStyle }
            />
        );
    }

    private _onNavigatorRef = (navigator: Navigator) => {
        this._navigator = navigator;
    }

    private _renderScene = (navigatorRoute: NavigatorTypes.NavigatorRoute) => {
        switch (navigatorRoute.routeId) {
            case NavigationRouteId.MainPanel:
                return <MainPanel onPressNavigate={ this._onPressNavigate } />

            case NavigationRouteId.SecondPanel:
                return <SecondPanel onNavigateBack={ this._onPressBack } />
        }

        return null;
    }

    private _onPressNavigate = () => {
        this._navigator.push({
            routeId: NavigationRouteId.SecondPanel,
            sceneConfigType: NavigatorTypes.NavigatorSceneConfigType.FloatFromRight
        });
    }

    private _onPressBack = () => {
        this._navigator.pop();
    }
}

export = App;
