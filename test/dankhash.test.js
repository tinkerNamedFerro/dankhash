var sha256 = require('sha256')
var DankHash = artifacts.require('DankHash')


contract('DankHash', function(accounts) {
    const owner = accounts[0]
    const alice = accounts[1]
    const bob = accounts[2]
    const emptyAddress = '0x0000000000000000000000000000000000000000'
    const newHash = '0x043A718774C572BD8A25ADBEB1BFCD5C0256AE11CECF9F9C3F925D0E52BEAF89'
    const newHash = '0x2313'

    it("should add an item with the provided name and price", async() => {
        const dankhash = await DankHash.deployed()

        var eventEmitted = false

        // var event = dankhash.ForSale()
        // await event.watch((err, res) => {
        //     sku = res.args.sku.toString(10)
        //     eventEmitted = true
        // })

        //const name = "book"

        const result = await dankhash.AddFileHash.call(newHash, {from: alice})

        // const result = await dankhash.fetchItem.call(sku)
        console.log(result);
        // assert.equal(result[0], name, 'the name of the last added item does not match the expected value')
        // assert.equal(result[2].toString(10), price, 'the price of the last added item does not match the expected value')
        // assert.equal(result[3].toString(10), 0, 'the state of the item should be "For Sale", which should be declared first in the State Enum')
        // assert.equal(result[4], alice, 'the address adding the item should be listed as the seller')
        // assert.equal(result[5], emptyAddress, 'the buyer address should be set to 0 when an item is added')
        // assert.equal(eventEmitted, true, 'adding an item should emit a For Sale event')
    })

});