// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { useEffect } from "react";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import mosipLogo from './assets/mosip_logo.png'

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        // displayRequiredFields = false,
        displayWide = false,
        showAnotherWayIfPresent = true,
        headerNode,
        // descText,
        // showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg, msgStr, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { realm, locale, auth, url, message, isAppInitiatedAction, pageId } = kcContext;
    console.log(kcContext)
    const { isReady } = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        "styles": [
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
            `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
            `${url.resourcesPath}/css/login.css`
        ],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": getClassName("kcBodyClass"),
        "htmlLangProperty": locale?.currentLanguageTag,
        "documentTitle": i18n.msgStr("loginTitle", kcContext.realm.displayName)
    });

    console.log(kcContext)

    useEffect(() => {
        console.log(`Value of MY_ENV_VARIABLE on the Keycloak server: "${kcContext.properties.MY_ENV_VARIABLE}"`);
    }, []);

    if (!isReady) {
        return null;
    }

    return (
        <div className={(getClassName("kcLoginClass"))}>
            <div id="kc-header" className={(getClassName("kcHeaderClass"), 'mb-10 flex flex-row justify-between items-center px-10')}>
                <div><img className="h-20 w-30" alt="logo" src={mosipLogo} /></div>
                <div> {realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1 && (
                    <div id="kc-locale">
                        <div id="kc-locale-wrapper" className={getClassName("kcLocaleWrapperClass")}>
                            <div className="kc-dropdown" id="kc-locale-dropdown">
                                <a href="#" id="kc-current-locale-link">
                                    {labelBySupportedLanguageTag[currentLanguageTag]}
                                </a>
                                <ul>
                                    {locale.supported.map(({ languageTag }) => (
                                        <li key={languageTag} className="kc-dropdown-item">
                                            <a href="#" onClick={() => changeLocale(languageTag)}>
                                                {labelBySupportedLanguageTag[languageTag]}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}</div>
            </div>
            <div className="flex justify-center">
                <div className={clsx(getClassName("kcFormCardClass"), displayWide && getClassName("kcFormCardAccountClass"), 'rounded-3xl p-5')}>
                    <header className={getClassName("kcFormHeaderClass")}>
                        {headerNode}
                        {/* {!(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                        displayRequiredFields ? (
                            <div className={getClassName("kcContentWrapperClass")}>
                                <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                    <span className="subtitle">
                                        <span className="required">*</span>
                                        {msg("requiredFields")}
                                    </span>
                                </div>
                                <div className="col-md-10">
                                    <h1 id="kc-page-title">{headerNode}</h1>
                                </div>
                            </div>
                        ) : (
                            <>
                              <h1 id="kc-page-title" className="text-3xl font-bold text-hTextColor font-sans">{headerNode}</h1>
                              <p className="text-pTextColor">{descText}</p>
                            </>
                        )
                    ) : displayRequiredFields ? (
                        <div className={getClassName("kcContentWrapperClass")}>
                            <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                <span className="subtitle">
                                    <span className="required">*</span> {msg("requiredFields")}
                                </span>
                            </div>
                            <div className="col-md-10">
                                {showUsernameNode}
                                <div className={getClassName("kcFormGroupClass")}>
                                    <div id="kc-username">
                                        <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                        <a id="reset-login" href={url.loginRestartFlowUrl}>
                                            <div className="kc-login-tooltip">
                                                <i className={getClassName("kcResetFlowIcon")}></i>
                                                <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {showUsernameNode}
                            <div className={getClassName("kcFormGroupClass")}>
                                <div id="kc-username">
                                    <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                    <a id="reset-login" href={url.loginRestartFlowUrl}>
                                        <div className="kc-login-tooltip">
                                            <i className={getClassName("kcResetFlowIcon")}></i>
                                            <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </>
                    )} */}
                    </header>
                    <div id="kc-content">
                        <div id="kc-content-wrapper">
                            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                <div className={clsx("alert", `alert-${message.type}`)}>
                                    {message.type === "success" && <span className={getClassName("kcFeedbackSuccessIcon")}></span>}
                                    {message.type === "warning" && <span className={getClassName("kcFeedbackWarningIcon")}></span>}
                                    {message.type === "error" && <span className={getClassName("kcFeedbackErrorIcon")}></span>}
                                    {message.type === "info" && <span className={getClassName("kcFeedbackInfoIcon")}></span>}
                                    {pageId === 'login.ftl' ? ( <span
                                        className="kc-feedback-text"
                                        dangerouslySetInnerHTML={{
                                            "__html": msgStr("logInErrorMsg")
                                        }}
                                    />) : (<span
                                        className="kc-feedback-text"
                                        dangerouslySetInnerHTML={{
                                            "__html": msgStr("registerErrorMsg")
                                        }}
                                    />)}
                                </div>
                            )}
                            {children}
                            {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
                                <form
                                    id="kc-select-try-another-way-form"
                                    action={url.loginAction}
                                    method="post"
                                    className={clsx(displayWide && getClassName("kcContentWrapperClass"))}
                                >
                                    <div
                                        className={clsx(
                                            displayWide && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                                        )}
                                    >
                                        <div className={getClassName("kcFormGroupClass")}>
                                            <input type="hidden" name="tryAnotherWay" value="on" />
                                            <a
                                                href="#"
                                                id="try-another-way"
                                                onClick={() => {
                                                    document.forms["kc-select-try-another-way-form" as never].submit();
                                                    return false;
                                                }}
                                            >
                                                {msg("doTryAnotherWay")}
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            )}
                            {displayInfo && (
                                <div id="kc-info" className={getClassName("kcSignUpClass")}>
                                    <div id="kc-info-wrapper" className={getClassName("kcInfoAreaWrapperClass")}>
                                        {infoNode}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}