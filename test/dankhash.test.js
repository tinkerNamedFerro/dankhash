var sha256 = require('sha256')
var DankHash = artifacts.require('DankHash')


contract('DankHash', function(accounts) {
    const owner = accounts[0]
    const emptyAddress = '0x0000000000000000000000000000000000000000'
    
    const bob = accounts[2]
    const bob_newHash = 0x554f020b0c89d5978928d31b8635a7eeddf0a3900abcacdbc39616f80d247f86;
    const bob_name = "Kali Linux Light 64 Bit"
    const bob_url = "https://www.kali.org/downloads/";
    const bob_version = 20182;
    const bob_date = 260818;
    
    const alice = accounts[1]
    const alice_newHash = 0x56f677e2edfb2efcd0b08662ddde824e254c3d53567ebbbcdbbf5c03efd9bc0f
    const alice_name = "Kali Linux 64 Bit";
    const alice_url = "https://www.kali.org/downloads/";
    const alice_version = 20182;
    const alice_date = 260818;

    const alice_new_name = "kitty cat 64 bit"
    const alice_new_url = "http://www.memes.com"

    it("1) should add file hash with file details", async() => {
        //This test is users can upload file hashes 
        //WHY: Basic funtionality test
        const dankhash = await DankHash.deployed()

        var eventEmitted = false

        await dankhash.AddFileHash(alice_newHash, alice_name, alice_url, alice_version, alice_date, {from: alice})
        const checkFileResult = await dankhash.CheckFileProvider.call(alice_newHash, {from: alice})

        assert.equal(checkFileResult[0], alice_name, 'Name should equal const name "Kali Linux"')
        assert.equal(checkFileResult[1], alice_url, 'URL should equal const URL "https://www.kali.org/downloads/"')
        assert.equal(checkFileResult[2].c, alice_version, 'Version should equal const URL "20182"')
        assert.equal(checkFileResult[3].c, alice_date, 'Date should equal const Date "260818"')
        assert.equal(checkFileResult[4], alice, 'hashUploader should have the same address is uploader')
    })

    it("2) Alice can change her upload", async() => {
        //This tests if user's file hashes can be modified by themselves
        //WHY: Cause everyone makes mistakes 
        const dankhash = await DankHash.deployed()

        var eventEmitted = false


        await dankhash.AddFileHash(alice_newHash, alice_new_name, alice_new_url, alice_version, alice_date, {from: alice})
        const checkFileResult = await dankhash.CheckFileProvider.call(alice_newHash, {from: alice})

        assert.equal(checkFileResult[0], alice_new_name, 'Name should equal const name "Kali Linux"')
        assert.equal(checkFileResult[1], alice_new_url, 'URL should equal const URL "https://www.kali.org/downloads/"')
        assert.equal(checkFileResult[4], alice, 'hashUploader should have the same address is uploader')
    })

    it("3) bob can't change alice's upload", async() => {
        //This tests if other people can modify other user's hash files.
        //WHY: cause we don't want hackers 
        const dankhash = await DankHash.deployed()
        var hacked  = "false"

        var eventEmitted = false
        
        
        try{
            await dankhash.AddFileHash(alice_newHash, bob_name, bob_url, bob_version, bob_date, {from: bob})
            hacked = "true";   
        }
        catch(err){
        }

        assert.equal("false", hacked, "This means you've been hacked")

    })

    it("4) circuit breaker stops AddFileHash", async() => {
        //This test is used to check self destruction. It should only be accessable via admin permissions
        //WHY: I definitely make mistakes even if little ones
        const dankhash = await DankHash.deployed()
        var AddFileHashUnaccessable  = "false"

        var eventEmitted = false
        
        await dankhash.SwitchStopped( {from: owner})

        
        
        try{
            //Test if contract is destroyed
            await dankhash.AddFileHash(bob_newHash, bob_name, bob_url, bob_version, bob_date, {from: bob})
            AddFileHashUnaccessable = "true";   
        }
        catch(err){
        }

        await dankhash.SwitchStopped( {from: owner}) //Resetting function accessable for next test
        
        assert.equal("false", AddFileHashUnaccessable, "AddFileHash function can still be called")
    })

    it("5) admins can kill contract", async() => {
        //This test is used to check self destruction. It should only be accessable via admin permissions
        //This function nneds to be tested last as it destroys the contract.
        //WHY: Cause I'm a total fuck up and should end it all.
        const dankhash = await DankHash.deployed()
        var destroyed  = "false"

        var eventEmitted = false
        
        await dankhash.Kill( {from: owner})
        
        try{
            //Test if contract is destroyed
            await dankhash.AddFileHash(bob_newHash, bob_name, bob_url, bob_version, bob_date, {from: bob})
            destroyed = "true";   
        }
        catch(err){
        }

        
        assert.equal("false", destroyed, "Can still access contract after destruction")
    })



});