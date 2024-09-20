import JSEncrypt from 'jsencrypt'

const publicKey =
	'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDUB86mVvb2G5mO28fzf2FV07pUvQ5Clp6OPK+Y3W2mS7pXh2DX97T7ejHNg1EO4bSSqIPfy75hqjHSDY+NNXRRRZAgd2lBBt7wtL7b8Y7k/4Irz6JA5u42eNhuAXZyLbVuav8fWzVkmJ+nHhCM+HNBKyAJF5R4TUi2N8arQgnLZQIDAQAB'

export function rsaEncrypt(value) {
	const jsRsa = new JSEncrypt()
	jsRsa.setPublicKey(publicKey)
	return jsRsa.encrypt(value)
}
