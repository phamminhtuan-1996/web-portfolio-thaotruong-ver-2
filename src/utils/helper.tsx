export function isMobileOrSmallScreen(): boolean {
    console.log('innerWidth', window.innerWidth);
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && window.innerWidth < 1200;

}