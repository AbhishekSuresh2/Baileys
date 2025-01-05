import { BinaryNode, getBinaryNodeChild } from '../WABinary'
import { makeGroupsSocket } from './groups'

export const makeNewsletterSocket = (config) => {
  const sock = makeGroupsSocket(config)
  const { query, generateMessageTag } = sock

  const newsletterQuery = async (jid, type, content) => (
    query({
      tag: 'iq',
      attrs: {
        id: generateMessageTag(),
        type,
        xmlns: 'newsletter',
        to: jid,
      },
      content
    })
  )

  return {
    ...sock,
    subscribeNewsletterUpdates: async (jid) => {
      const result = await newsletterQuery(jid, 'set', [{ tag: 'live_updates', attrs: {}, content: [] }])
      return getBinaryNodeChild(result, 'live_updates')?.attrs
    }
  }
}
