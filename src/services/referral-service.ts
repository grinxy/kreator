
export class ReferralService {
  /**
   * Obtain the referral code from the URL.:
   * /registro?ref=KR-xxxx
   */
  static getReferralCodeFromUrl(): string | null {
    if (typeof window === "undefined") return null

    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get("ref")
  }
}
